
-- CREATE TABLE "User" (
--   "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),  
--   "firstName" VARCHAR(255),  
--   "lastName" VARCHAR(255),   
--   "email" VARCHAR(255) UNIQUE NOT NULL,  
--   "mobile" VARCHAR(10) UNIQUE, 
--   "password" VARCHAR(255),  
--   "reset_token" VARCHAR(255),  
--   "reset_token_expiry" TIMESTAMP,  
--   "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
--   "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
--   "deletedAt" TIMESTAMP WITH TIME ZONE 
-- )





-- CREATE TABLE "Board" (
-- "id" UUID  DEFAULT gen_random_uuid()  PRIMARY KEY,  
--   "title" VARCHAR(255) NOT NULL, 
--   "userId" UUID NOT NULL ,  
--   "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   "deletedAt" TIMESTAMP WITH TIME ZONE,  

--     FOREIGN KEY ("userId") REFERENCES "User"("id")  ON DELETE CASCADE
-- );






-- CREATE TABLE "Column" (
--   "id" UUID  DEFAULT gen_random_uuid()  PRIMARY KEY,  
--   "title" VARCHAR(255) NOT NULL,  
--   "boardId" UUID , 
--   "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   "deletedAt" TIMESTAMP WITH TIME ZONE,  

--     FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE
-- );



--  CREATE TABLE "Task" (
--   "id" UUID  DEFAULT gen_random_uuid() PRIMARY KEY,  
--   "title" VARCHAR(255) NOT NULL,  
--   "description" TEXT NOT NULL,  
--   "columnId" UUID , 
--   "order" INTEGER NOT NULL DEFAULT 0,  
--   "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   "deletedAt" TIMESTAMP WITH TIME ZONE,

-- FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE CASCADE

-- );