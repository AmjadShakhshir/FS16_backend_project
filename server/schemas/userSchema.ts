import mongoose from 'mongoose';
import { z } from 'zod';

export const userBodySchema = z.object({ 
    name: z.string()
    .min(3, { message:
        "Must be at least 3 characters long"
    })
    .max(20, { 
        message: "Must be at most 20 characters long"
    }),
    email: z.string({
        required_error: "Email is required",
    }).email(),
    password: z.string().min(6, { 
        message: "Must be at least 6 characters long"
    })
    .max(20, {
        message: "Must be at most 20 characters long"
    }),

    roleId: z.string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val))
    .optional(),
    logInWithGoogle: z.boolean().optional(),
    avatar: z.string().optional(),
})
.strict();

export const updatedUserBodySchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).max(20).optional(),
        roleId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)).optional(),
        avatar: z.string().optional(),
}).partial().strict();

export const userSchema = z.object({
    body: userBodySchema,
});

export const updateUserSchema = z.object({
    body: updatedUserBodySchema,
});

