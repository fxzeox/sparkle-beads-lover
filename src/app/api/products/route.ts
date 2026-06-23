import { connectToDatabase } from '@/lib/mongodb';
import { normalizeProductDescription } from '@/lib/productDescription';
import Product from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    const normalizedProducts = products.map((product) => ({
      ...product,
      description: normalizeProductDescription(product.description, product.name, product.price),
    }));

    return NextResponse.json(normalizedProducts, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: 'Error fetching products',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const body = await request.json();

    const product = new Product({
      name: body.name,
      price: body.price,
      image: body.image,
      whatsapp: body.whatsapp,
      description: normalizeProductDescription(body.description, body.name, body.price),
    });

    await product.save();
    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: 'Error creating product',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'Product ID is required' },
        { status: 400 }
      );
    }

    await Product.findByIdAndDelete(id);
    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: 'Error deleting product',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: 'Product ID is required' },
        { status: 400 }
      );
    }

    const payload = {
      ...body,
      description: normalizeProductDescription(body.description, body.name, body.price),
    };

    const product = await Product.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: 'Error updating product',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
