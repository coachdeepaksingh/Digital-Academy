USE [DigitalAcademy]
GO
/****** Object:  StoredProcedure [dbo].[spUpdateProfile]    Script Date: 06-12-2023 17:23:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[spUpdateProfile]
(
@ProfileId int,
@ProfileName varchar (150),
@FatherName varchar (150),
@ShortIntro varchar (350),
@DateofBirth varchar (20),
@EduCation varchar (150),
@AboutMe varchar (6500),
@ProFession varchar (150),
@AddRess varchar (350),
@AddProof varchar (500),
@IdProof varchar (500)
) 
AS
BEGIN
UPDATE  Profile SET ProfileName = @ProfileName, FatherName = @FatherName, ShortIntro = @ShortIntro, AboutMe =  @AboutMe, DateofBirth = @DateofBirth, EduCation = @EduCation, ProFession = @ProFession, [AddRess] = @AddRess, AddProof = @AddProof, IdProof = @IdProof
WHERE ProfileId = @ProfileId
END