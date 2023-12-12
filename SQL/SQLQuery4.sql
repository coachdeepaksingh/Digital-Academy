USE [DigitalAcademy]
GO
/****** Object:  StoredProcedure [dbo].[spGetAllProfiles]    Script Date: 04-12-2023 15:51:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[spGetAllProfiles]
AS
BEGIN
Select p.*, typ.UserType  From Profile p
JOIN UserTypes typ On p.UserTypeId = typ.UserTypeId
END