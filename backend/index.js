import natural from "natural";

// Task 8 requires the natural npm package import. The tokenizer is available
// for future search enhancements while the current REST search uses MongoDB filters.
export const tokenizer = new natural.WordTokenizer();
