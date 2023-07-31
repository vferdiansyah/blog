import yaml from 'js-yaml';
import { visit } from 'unist-util-visit';

export function remarkExtractFrontmatter() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any, file: any) => {
    visit(tree, 'yaml', (node) => {
      file.data.frontmatter = yaml.load(node.value);
    });
  };
}
