import { describe, it, expect } from "vitest";
import { validate } from 'class-validator';
import { CreateCampusDto } from "./create-campus.dto";

describe('CreateCampusDto', () => {
    it('should validate a valid DTO', async () => {
        const dto = new CreateCampusDto();
        dto.name = 'Simplon Paris';
        dto.uuidGuild = '123456789012345678';
        dto.uuidRole = '234567890123456789';

        const errors = await validate(dto);
        expect(errors).toHaveLength(0);
    });

    it('should fail validation for missing required fields', async () => {
        const dto = new CreateCampusDto();

        const errors = await validate(dto);
        
        expect(errors).toHaveLength(3);
        
        const errorProperties = errors.map(error => error.property);
        expect(errorProperties).toContain('name');
        expect(errorProperties).toContain('uuidGuild');
        expect(errorProperties).toContain('uuidRole');
    });

    it('should fail validation for short name', async () => {
        const dto = new CreateCampusDto();
        dto.name = 'd';
        dto.uuidGuild = '123456789012345678';
        dto.uuidRole = '234567890123456789';

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('name');
    });

    it('should fail validation for invalid uuidGuild', async () => {
        const dto = new CreateCampusDto();
        dto.name = 'Simplon Paris';
        dto.uuidGuild = '123';
        dto.uuidRole = '234567890123456789';

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('uuidGuild');
    });

    it('should fail validation for invalid uuidRole', async () => {
        const dto = new CreateCampusDto();
        dto.name = 'Simplon Paris';
        dto.uuidGuild = '123456789012345678';
        dto.uuidRole = '123'; // Too short

        const errors = await validate(dto);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('uuidRole');
    });
});