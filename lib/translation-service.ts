export class TranslationService {
  private static apiKey = process.env.TRANSLATION_API_KEY;
  private static accountId = process.env.TRANSLATION_ACCOUNT_ID;

  static async translateText(text: string, targetLanguage: string): Promise<string> {
    if (!this.apiKey) return text;

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLanguage })
      });
      
      const data = await response.json();
      return data.translatedText || text;
    } catch {
      return text;
    }
  }
}