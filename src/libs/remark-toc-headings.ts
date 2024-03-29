import { slug } from 'github-slugger';
import type { Heading } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { remark } from 'remark';
import type { Parent } from 'unist';
import { visit } from 'unist-util-visit';
import type { VFile } from 'vfile';

export type Toc = {
  value: string;
  depth: number;
  url: string;
}[];

/**
 * Extracts TOC headings from markdown file and adds it to the file's data object.
 */
export function remarkTocHeadings() {
  return (tree: Parent, file: VFile) => {
    const toc: Toc = [];
    visit(tree, 'heading', (node: Heading) => {
      const textContent = toString(node);
      toc.push({
        value: textContent,
        url: '#' + slug(textContent),
        depth: node.depth,
      });
    });
    file.data.toc = toc;
  };
}

/**
 * Passes markdown file through remark to extract TOC headings
 */
export async function remarkExtractTocHeadings(markdown: string): Promise<Toc> {
  const vfile = await remark().use(remarkTocHeadings).process(markdown);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return vfile.data.toc;
}
