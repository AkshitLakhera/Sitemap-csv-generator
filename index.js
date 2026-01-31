import axios from "axios"
import fs from "fs"
import { parseStringPromise } from "xml2js"; // to convert xml structure in js object
const SITEMAP_INDEX =
  "https://old.wildwoodguitars.com/sitemap_index.xml";
const OLD_DOMAIN = "https://old.wildwoodguitars.com"; //redirected from here
const NEW_DOMAIN = "https://wildwoodguitars.com";
const OUTPUT_FILE = "./urls.csv";
//we will make stream
const csvStream = fs.createWriteStream(OUTPUT_FILE);
csvStream.write("old_url,new_url\n");
//to  get all the url list
async function getchildsitemap(){
    const res= await axios.get(SITEMAP_INDEX);
    const xml= await parseStringPromise(res.data);
    return xml.sitemapindex.sitemap.map(
        sm => sm.loc[0]
    );
}
async function getUrlsFromSitemap(url) {
    const res = await axios.get(url);
    const xml = await parseStringPromise(res.data);
  
    return xml.urlset.url.map(
      u => u.loc[0]
    );
  }
  async  function run(){
const sitemapUrls=await getchildsitemap();
const seen = new Set();
for(const sm of sitemapUrls){
    const urls = await getUrlsFromSitemap(sm);
    for (const oldUrl of urls) {
        const newUrl = oldUrl.replace(OLD_DOMAIN, NEW_DOMAIN);
        if (!seen.has(newUrl)) {
          seen.add(newUrl);
          csvStream.write(`${oldUrl},${newUrl}\n`);
        }
      }
}
csvStream.end();
console.log(`Done. Total URLs: ${seen.size}`);
  }  
  run();