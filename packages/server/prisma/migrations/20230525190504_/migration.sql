-- AlterTable
CREATE SEQUENCE nhlbracketvalue_id_seq;
ALTER TABLE "NhlBracketValue" ALTER COLUMN "id" SET DEFAULT nextval('nhlbracketvalue_id_seq');
ALTER SEQUENCE nhlbracketvalue_id_seq OWNED BY "NhlBracketValue"."id";
