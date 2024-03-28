import {
  InputRule,
  markInputRule,
  markPasteRule,
  PasteRule,
} from "@tiptap/core";
import { Link } from "@tiptap/extension-link";

import type { LinkOptions } from "@tiptap/extension-link";

const inputRegex = /(?:^|\s)\[([^\]]*)?\]\((\S+)(?: ["“](.+)["”])?\)$/i;

const pasteRegex = /(?:^|\s)\[([^\]]*)?\]\((\S+)(?: ["“](.+)["”])?\)/gi;

function linkInputRule(config: Parameters<typeof markInputRule>[0]) {
  const defaultMarkInputRule = markInputRule(config);

  return new InputRule({
    find: config.find,
    handler(props: any) {
      const { tr } = props.state;

      defaultMarkInputRule.handler(props);
      tr.setMeta("preventAutolink", true);
    },
  });
}

function linkPasteRule(config: Parameters<typeof markPasteRule>[0]) {
  const defaultMarkPasteRule = markPasteRule(config);

  return new PasteRule({
    find: config.find,
    handler(props: any) {
      const { tr } = props.state;

      defaultMarkPasteRule.handler(props);
      tr.setMeta("preventAutolink", true);
    },
  });
}

const RichTextLink = Link.extend({
  inclusive: false,
  addAttributes() {
    return {
      ...this.parent?.(),
      title: {
        default: null,
      },
    };
  },
  addInputRules() {
    return [
      linkInputRule({
        find: inputRegex,
        type: this.type,

        getAttributes(match: any) {
          return {
            title: match.pop()?.trim(),
            href: match.pop()?.trim(),
          };
        },
      }),
    ];
  },
  addPasteRules() {
    return [
      linkPasteRule({
        find: pasteRegex,
        type: this.type,

        getAttributes(match: any) {
          return {
            title: match.pop()?.trim(),
            href: match.pop()?.trim(),
          };
        },
      }),
    ];
  },
});

export { RichTextLink };

export type { LinkOptions as RichTextLinkOptions };
