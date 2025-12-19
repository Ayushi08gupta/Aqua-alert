import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage } = await request.json();
    
    const response = await fetch('https://api.translate.service.com/v1/translate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TRANSLATION_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Account-ID': process.env.TRANSLATION_ACCOUNT_ID!
      },
      body: JSON.stringify({
        text,
        target_language: targetLanguage,
        source_language: 'auto'
      })
    });

    const data = await response.json();
    return NextResponse.json({ translatedText: data.translated_text });
  } catch {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}