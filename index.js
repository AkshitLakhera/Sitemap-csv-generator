import axios from "axios"
import fs from "fs"
import { parseStringPromise } from "xml2js"; // to convert xml structure in js object
const SITEMAP_INDEX =
  "https://old.wildwoodguitars.com/sitemap_index.xml";
const OLD_DOMAIN = "https://old.wildwoodguitars.com"; //redirected from here
const NEW_DOMAIN = "https://wildwoodguitars.com";
const OUTPUT_FILE = "./urls.csv";
//we will make stream
const csvstream=