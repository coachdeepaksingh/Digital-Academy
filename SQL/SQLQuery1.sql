USE [DigitalAcademy]
GO
/****** Object:  StoredProcedure [dbo].[spAddChapter]    Script Date: 11-12-2023 21:14:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[spAddChapter]
(
@ChapTitle varchar (150),
@CourseId int
) 
AS
BEGIN
INSERT INTO Chapters (ChapTitle, CourseId)
VALUES (@ChapTitle, @CourseId)

SELECT CAST(SCOPE_IDENTITY() AS INT)
END