USE [ES]
GO
SET IDENTITY_INSERT [dbo].[Surveys] ON 

INSERT [dbo].[Surveys] ([Id], [Name], [StartDate], [EndTime], [Status], [SerminarId], [CreatedDate], [ModifiedDate], [DeletedDate], [Description]) VALUES (1, N' Closed Survey of seminar 1', CAST(N'2021-08-04T07:05:40.877' AS DateTime), CAST(N'2021-08-04T07:05:40.877' AS DateTime), 1, 3, CAST(N'2021-08-04T14:06:23.1918293' AS DateTime2), NULL, NULL, N'string')
INSERT [dbo].[Surveys] ([Id], [Name], [StartDate], [EndTime], [Status], [SerminarId], [CreatedDate], [ModifiedDate], [DeletedDate], [Description]) VALUES (2, N' Happening Survey of seminar 1', CAST(N'2021-08-04T07:05:40.877' AS DateTime), CAST(N'2021-08-04T07:05:40.877' AS DateTime), 2, 3, CAST(N'2021-08-04T14:06:47.5313643' AS DateTime2), NULL, NULL, N'string')
INSERT [dbo].[Surveys] ([Id], [Name], [StartDate], [EndTime], [Status], [SerminarId], [CreatedDate], [ModifiedDate], [DeletedDate], [Description]) VALUES (3, N' Planed Survey of seminar 1', CAST(N'2021-08-04T07:05:40.877' AS DateTime), CAST(N'2021-08-04T07:05:40.877' AS DateTime), 2, 3, CAST(N'2021-08-04T14:06:55.1398530' AS DateTime2), NULL, NULL, N'string')
SET IDENTITY_INSERT [dbo].[Surveys] OFF
GO
SET IDENTITY_INSERT [dbo].[Survey_Questions] ON 

INSERT [dbo].[Survey_Questions] ([Id], [SurveyId], [QuestionId], [CreatedDate], [ModifiedDate], [DeletedDate]) VALUES (1, 2, 1, CAST(N'2021-08-04T14:12:02.7900787' AS DateTime2), NULL, NULL)
INSERT [dbo].[Survey_Questions] ([Id], [SurveyId], [QuestionId], [CreatedDate], [ModifiedDate], [DeletedDate]) VALUES (2, 2, 2, CAST(N'2021-08-04T14:12:13.4535925' AS DateTime2), NULL, NULL)
INSERT [dbo].[Survey_Questions] ([Id], [SurveyId], [QuestionId], [CreatedDate], [ModifiedDate], [DeletedDate]) VALUES (3, 2, 3, CAST(N'2021-08-04T14:12:17.2191719' AS DateTime2), NULL, NULL)
INSERT [dbo].[Survey_Questions] ([Id], [SurveyId], [QuestionId], [CreatedDate], [ModifiedDate], [DeletedDate]) VALUES (4, 2, 4, CAST(N'2021-08-04T14:12:20.4368838' AS DateTime2), NULL, NULL)
INSERT [dbo].[Survey_Questions] ([Id], [SurveyId], [QuestionId], [CreatedDate], [ModifiedDate], [DeletedDate]) VALUES (5, 2, 5, CAST(N'2021-08-04T14:12:22.9805655' AS DateTime2), NULL, NULL)
INSERT [dbo].[Survey_Questions] ([Id], [SurveyId], [QuestionId], [CreatedDate], [ModifiedDate], [DeletedDate]) VALUES (6, 2, 6, CAST(N'2021-08-04T14:12:25.2612303' AS DateTime2), NULL, NULL)
INSERT [dbo].[Survey_Questions] ([Id], [SurveyId], [QuestionId], [CreatedDate], [ModifiedDate], [DeletedDate]) VALUES (7, 2, 7, CAST(N'2021-08-04T14:12:27.8492986' AS DateTime2), NULL, NULL)
INSERT [dbo].[Survey_Questions] ([Id], [SurveyId], [QuestionId], [CreatedDate], [ModifiedDate], [DeletedDate]) VALUES (8, 2, 8, CAST(N'2021-08-04T14:12:30.3392899' AS DateTime2), NULL, NULL)
INSERT [dbo].[Survey_Questions] ([Id], [SurveyId], [QuestionId], [CreatedDate], [ModifiedDate], [DeletedDate]) VALUES (9, 2, 9, CAST(N'2021-08-04T14:12:34.5085324' AS DateTime2), NULL, NULL)
INSERT [dbo].[Survey_Questions] ([Id], [SurveyId], [QuestionId], [CreatedDate], [ModifiedDate], [DeletedDate]) VALUES (10, 2, 10, CAST(N'2021-08-04T14:12:38.2382465' AS DateTime2), NULL, NULL)
INSERT [dbo].[Survey_Questions] ([Id], [SurveyId], [QuestionId], [CreatedDate], [ModifiedDate], [DeletedDate]) VALUES (11, 1, 1, CAST(N'2021-08-04T14:16:52.1549324' AS DateTime2), NULL, NULL)
INSERT [dbo].[Survey_Questions] ([Id], [SurveyId], [QuestionId], [CreatedDate], [ModifiedDate], [DeletedDate]) VALUES (12, 1, 2, CAST(N'2021-08-04T14:16:54.6352855' AS DateTime2), NULL, NULL)
INSERT [dbo].[Survey_Questions] ([Id], [SurveyId], [QuestionId], [CreatedDate], [ModifiedDate], [DeletedDate]) VALUES (13, 1, 3, CAST(N'2021-08-04T14:16:58.4920466' AS DateTime2), NULL, NULL)
INSERT [dbo].[Survey_Questions] ([Id], [SurveyId], [QuestionId], [CreatedDate], [ModifiedDate], [DeletedDate]) VALUES (14, 1, 4, CAST(N'2021-08-04T14:17:00.9757012' AS DateTime2), NULL, NULL)
INSERT [dbo].[Survey_Questions] ([Id], [SurveyId], [QuestionId], [CreatedDate], [ModifiedDate], [DeletedDate]) VALUES (15, 1, 5, CAST(N'2021-08-04T14:17:03.4279612' AS DateTime2), NULL, NULL)
SET IDENTITY_INSERT [dbo].[Survey_Questions] OFF
GO
