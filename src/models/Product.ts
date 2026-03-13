import mongoose, { Schema, Document } from 'mongoose';

const DESCRIPTION_WORD_LIMIT = 12;

export interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  whatsapp: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: 0,
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    whatsapp: {
      type: String,
      required: [true, 'Please provide a WhatsApp number'],
    },
    description: {
      type: String,
      trim: true,
      validate: {
        validator: (value: string | undefined) => {
          if (!value) return true;
          return value.split(/\s+/).filter(Boolean).length <= DESCRIPTION_WORD_LIMIT;
        },
        message: `Description must be ${DESCRIPTION_WORD_LIMIT} words or fewer`,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>('Product', productSchema);
