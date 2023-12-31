USE [DigitalAcademy]
GO
/****** Object:  StoredProcedure [dbo].[spUpdateFileName]    Script Date: 11-11-2023 11:25:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[spUpdateFileName]
@id INT,
@module VARCHAR(50),
@filename VARCHAR(150)
AS
BEGIN

	IF @module = 'ebook'
	BEGIN
		UPDATE Ebooks SET EbookImage=@filename where EbookId=@id
	END

	IF @module = 'ebookPdf'
	BEGIN
		UPDATE Ebooks SET EbookPdf=@filename where EbookId=@id
	END

	IF @module = 'topic'
	BEGIN
		UPDATE Topics SET FilePath=@filename where TopId=@id
	END

	IF @module = 'user'
	BEGIN
		UPDATE [Profile] SET ProfileImage=@filename where ProfileId=@id
	END

END