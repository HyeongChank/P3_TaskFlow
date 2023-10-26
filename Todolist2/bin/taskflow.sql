-- H2 2.1.214;
;             
CREATE USER IF NOT EXISTS "SA" SALT '384fc7a0082024ae' HASH '314972f934ce4117006592922ffea42fd007b1f0eaf512f816a15f6160d1f208' ADMIN;         
CREATE SEQUENCE "PUBLIC"."IMAGELOAD_SEQ" START WITH 1 INCREMENT BY 50;        
CREATE CACHED TABLE "PUBLIC"."IMAGELOAD"(
    "ID" BIGINT NOT NULL,
    "CDATE" CHARACTER VARYING(255),
    "MID" CHARACTER VARYING(255),
    "NUM" INTEGER NOT NULL,
    "PATH" CHARACTER VARYING(255)
);              
ALTER TABLE "PUBLIC"."IMAGELOAD" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_7" PRIMARY KEY("ID");    
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.IMAGELOAD;               
CREATE INDEX "PUBLIC"."IDX9WG8SI3SXU9GSISINTVYTUDQX" ON "PUBLIC"."IMAGELOAD"("ID" NULLS FIRST);               
CREATE INDEX "PUBLIC"."IDX7DWTYXJOQDVUSTYSBWIRY69X3" ON "PUBLIC"."IMAGELOAD"("PATH" NULLS FIRST);             
CREATE INDEX "PUBLIC"."IDX6GNPD4CWHK248JWQQ0RNG6G9X" ON "PUBLIC"."IMAGELOAD"("MID" NULLS FIRST);              
CREATE INDEX "PUBLIC"."IDX3TXTXAWNC0Q3K67NA2HKI2HQW" ON "PUBLIC"."IMAGELOAD"("CDATE" NULLS FIRST);            
CREATE INDEX "PUBLIC"."IDXET3KEOI4GA2J1VHQ2K9VCEECY" ON "PUBLIC"."IMAGELOAD"("NUM" NULLS FIRST);              
CREATE CACHED TABLE "PUBLIC"."MEMBERS"(
    "SEQ" BIGINT GENERATED BY DEFAULT AS IDENTITY(START WITH 1) NOT NULL,
    "MDATE" TIMESTAMP(6),
    "MEMAIL" CHARACTER VARYING(255),
    "MID" CHARACTER VARYING(255),
    "PASSWORD" CHARACTER VARYING(255)
);             
ALTER TABLE "PUBLIC"."MEMBERS" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_6" PRIMARY KEY("SEQ");     
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.MEMBERS; 
CREATE INDEX "PUBLIC"."IDXEMSOR5AAYS2JC6I2XT09QDCU6" ON "PUBLIC"."MEMBERS"("SEQ" NULLS FIRST);
CREATE INDEX "PUBLIC"."IDX8V9OFXVX2FDSQACXSNF5M34RW" ON "PUBLIC"."MEMBERS"("MID" NULLS FIRST);
CREATE INDEX "PUBLIC"."IDXTN6SUMTHLFTS0FLHT9PYQ4ITH" ON "PUBLIC"."MEMBERS"("PASSWORD" NULLS FIRST);           
CREATE INDEX "PUBLIC"."IDXHHPN0QIR90YC87O122H2SCBL1" ON "PUBLIC"."MEMBERS"("MDATE" NULLS FIRST);              
CREATE INDEX "PUBLIC"."IDXOA07T38BR8N1ETRGGC6CVKD4V" ON "PUBLIC"."MEMBERS"("MEMAIL" NULLS FIRST);             
CREATE CACHED TABLE "PUBLIC"."TODOLIST"(
    "ID" BIGINT GENERATED BY DEFAULT AS IDENTITY(START WITH 1 RESTART WITH 2) NOT NULL,
    "CDATE" CHARACTER VARYING(255),
    "CONTENT" CHARACTER VARYING(255),
    "MID" CHARACTER VARYING(255),
    "SUCCESS" CHARACTER VARYING(255),
    "TODO" CHARACTER VARYING(255)
);
ALTER TABLE "PUBLIC"."TODOLIST" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_E" PRIMARY KEY("ID");     
-- 1 +/- SELECT COUNT(*) FROM PUBLIC.TODOLIST;
INSERT INTO "PUBLIC"."TODOLIST" VALUES
(1, '2023-06-23', 'test', 'jsk2888', NULL, 'test');   
CREATE INDEX "PUBLIC"."IDXFBTPW2NTDUUJQKD8VACIJB11S" ON "PUBLIC"."TODOLIST"("ID" NULLS FIRST);
CREATE INDEX "PUBLIC"."IDX2Q7F8DM7SIX92BYG3BMP5NLDV" ON "PUBLIC"."TODOLIST"("TODO" NULLS FIRST);              
CREATE INDEX "PUBLIC"."IDX829F0989KUSVMEBCPAXWACB8D" ON "PUBLIC"."TODOLIST"("SUCCESS" NULLS FIRST);           
CREATE INDEX "PUBLIC"."IDXRS1USMRFKIT9IWYIRPVAUD4VQ" ON "PUBLIC"."TODOLIST"("CDATE" NULLS FIRST);             
CREATE INDEX "PUBLIC"."IDXIXXFKQWE2H7VW65EA4PVXQ4J7" ON "PUBLIC"."TODOLIST"("CONTENT" NULLS FIRST);           
CREATE INDEX "PUBLIC"."IDXHDQ7F6CUDPSXT232KUE192PH1" ON "PUBLIC"."TODOLIST"("MID" NULLS FIRST);               
