
-- CREATE TABLE "User" (
--   "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),  
--   "firstName" VARCHAR(255),  
--   "lastName" VARCHAR(255),   
--   "email" VARCHAR(255) UNIQUE NOT NULL,  
--   "mobile" VARCHAR(10) UNIQUE, 
--   "password" VARCHAR(255),  
--   "reset_token" VARCHAR(255),  
--   "reset_token_expiry" TIMESTAMP,  
--    "userId" UUID UNIQUE ,
--   "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
--   "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
--   "deletedAt" TIMESTAMP WITH TIME ZONE,  

--   CONSTRAINT "email_unique" UNIQUE ("email"), 
--   CONSTRAINT "mobile_unique" UNIQUE ("mobile"), 

--    FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE
-- )





-- CREATE TABLE "Board" (
-- "id" UUID  DEFAULT gen_random_uuid(),  
--   "title" VARCHAR(255) NOT NULL, 
--   "userId" UUID NOT NULL PRIMARY KEY,  
--   "boardId" UUID UNIQUE,
--   "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   "deletedAt" TIMESTAMP WITH TIME ZONE,  

--     FOREIGN KEY ("boardId") REFERENCES "Board"("boardId")  ON DELETE CASCADE
-- );






-- CREATE TABLE "Column" (
--   "id" UUID  DEFAULT gen_random_uuid(),  
--   "title" VARCHAR(255) NOT NULL,  
--   "boardId" UUID NOT NULL PRIMARY KEY, 
--   "columnId" UUID UNIQUE DEFAULT gen_random_uuid(),
--   "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   "deletedAt" TIMESTAMP WITH TIME ZONE,  

--     FOREIGN KEY ("columnId") REFERENCES "Column"("columnId") ON DELETE CASCADE
-- );


--  CREATE TABLE "Task" (
--   "id" UUID  DEFAULT gen_random_uuid(),  
--   "title" VARCHAR(255) NOT NULL,  
--   "description" TEXT NOT NULL,  
--   "columnId" UUID NOT NULL PRIMARY KEY, 
--   "order" INTEGER NOT NULL DEFAULT 0,  
--   "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   "deletedAt" TIMESTAMP WITH TIME ZONE
-- );











