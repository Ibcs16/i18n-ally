import { TextDocument } from 'vscode'
import { KeyStyle, ParserOptions, KeyInDocument, Config } from '../core'
import { File } from '../utils'

export abstract class Parser {
  private supportedExtsRegex: RegExp

  readonly readonly: boolean = false

  constructor (
    public readonly languageIds: string[],
    public readonly supportedExts: string|RegExp,
    public options: ParserOptions = {
      get indent () {
        return Config.indent
      },
      get tab () {
        return Config.tabStyle
      },
    },
  ) {
    this.supportedExtsRegex = new RegExp(supportedExts)
  }

  supports (ext: string) {
    return !!ext.toLowerCase().match(this.supportedExtsRegex)
  }

  async load (filepath: string): Promise<object> {
    const raw = await File.read(filepath)
    return await this.parse(raw)
  }

  async save (filepath: string, object: object, sort: boolean) {
    const text = await this.dump(object, sort)
    await File.write(filepath, text)
  }

  abstract parse(text: string): Promise<object>

  abstract dump(object: object, sort: boolean): Promise<string>

  parseAST (text: string): KeyInDocument[] {
    return []
  }

  navigateToKey (text: string, keypath: string, keystyle: KeyStyle) {
    return this.parseAST(text).find(k => k.key === keypath)
  }

  annotationSupported = false
  annotationLanguageIds: string[] = []
  annotationGetKeys (document: TextDocument) {
    return this.parseAST(document.getText())
  }
}
