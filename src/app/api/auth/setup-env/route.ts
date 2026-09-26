import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { supabaseUrl, supabaseAnonKey } = body;

    if (!supabaseUrl || typeof supabaseUrl !== 'string' || !supabaseUrl.startsWith('http')) {
      return NextResponse.json(
        { error: 'Geçersiz Supabase Proje URL adresi. https:// ile başlamalıdır.' },
        { status: 400 }
      );
    }

    if (!supabaseAnonKey || typeof supabaseAnonKey !== 'string' || supabaseAnonKey.trim().length < 10) {
      return NextResponse.json(
        { error: 'Geçersiz Supabase Anon Key. Supabase Dashboard API anahtarınızı girin.' },
        { status: 400 }
      );
    }

    try {
      const envFilePath = path.join(process.cwd(), '.env.local');
      let content = '';

      if (fs.existsSync(envFilePath)) {
        content = fs.readFileSync(envFilePath, 'utf8');
        if (/NEXT_PUBLIC_SUPABASE_URL=.*/.test(content)) {
          content = content.replace(/NEXT_PUBLIC_SUPABASE_URL=.*/, `NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl.trim()}`);
        } else {
          content += `\nNEXT_PUBLIC_SUPABASE_URL=${supabaseUrl.trim()}`;
        }

        if (/NEXT_PUBLIC_SUPABASE_ANON_KEY=.*/.test(content)) {
          content = content.replace(/NEXT_PUBLIC_SUPABASE_ANON_KEY=.*/, `NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey.trim()}`);
        } else {
          content += `\nNEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey.trim()}`;
        }
      } else {
        content = `# Supabase Environment Configuration\nNEXT_PUBLIC_SUPABASE_URL=${supabaseUrl.trim()}\nNEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey.trim()}\n`;
      }

      fs.writeFileSync(envFilePath, content.trim() + '\n', 'utf8');
    } catch {
      // In serverless / read-only production environments like Vercel, writing to disk is gracefully ignored
    }

    // Safely assign via bracket notation to prevent Webpack DefinePlugin rvalue replacement
    const envObj = process.env as Record<string, string | undefined>;
    envObj['NEXT_PUBLIC_SUPABASE_URL'] = supabaseUrl.trim();
    envObj['NEXT_PUBLIC_SUPABASE_ANON_KEY'] = supabaseAnonKey.trim();

    return NextResponse.json({
      success: true,
      message: '.env.local dosyası başarıyla güncellendi.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Yapılandırma kaydedilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
