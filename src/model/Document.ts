import {Comment} from './Comment';
import {DocumentOptions} from './DocumentOptions';
import {DocumentType} from './DocumentType';
import {DocumentBase} from './DocumentBase';

export abstract class Document extends DocumentBase implements DocumentOptions {
  private _description: string;
  private _createdAt: string;
  protected _parent: Document = null;

  constructor(options: DocumentOptions) {
    super(options);
    this._createdAt = options.createdAt;
    options.comments.forEach(comment => {
      this.comments.push(new Comment(comment));
    });
    this._parent = options.parent;
  }

  abstract get type(): DocumentType;

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  get parent(): Document {
    return this._parent;
  }

  set parent(value: Document) {
    this._parent = value;
  }

}
