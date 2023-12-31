USE [DigitalAcademy]
GO
/****** Object:  StoredProcedure [dbo].[spGetAllCourses]    Script Date: 05-12-2023 12:45:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[spGetAllCourses]
AS
BEGIN
Select c.*, cat.CatName from Courses c
JOIN Categories cat ON c.CourseCategory = cat.CatId
END

execute spGetAllCourses;