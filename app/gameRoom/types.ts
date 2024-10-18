export interface Question {
  id: string;
  question: string;
  /**
   * The options to choose from
   * {a: "Option A", b: "Option B", c: "Option C", d: "Option D"}
   */
  options: Record<string, string>;
  /**
   * The correct answer key
   */
  answer: string;
}
