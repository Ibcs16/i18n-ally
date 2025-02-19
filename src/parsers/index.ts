import { Json5Parser } from './Json5Parser'
import { JsonParser } from './JsonParser'
import { YamlParser } from './YamlParser'
import { JavascriptParser } from './JavascriptParser'
import { IniParser } from './IniParser'

export const PARSERS = [
  new JsonParser(),
  new YamlParser(),
  new JavascriptParser(),
  new Json5Parser(),
  new IniParser(),
]
