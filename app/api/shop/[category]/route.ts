// app/api/shop/[category]/route.ts
import { getCategoryData } from '@/app/utils/shopUtils';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const data = await getCategoryData(params.category);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 404 }
    );
  }
}