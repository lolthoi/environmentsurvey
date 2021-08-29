using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.BusinessLogic
{
    public interface ICloudinaryService
    {
        public string DeleteImage(string pathImage);
    }
    public class CloudinaryService : ICloudinaryService
    {
        public static Cloudinary cloudinary;
        public const string CLOUD_NAME = "dhy6m4jwi";
        public const string API_KEY = "799491767437771";
        public const string API_SECRET = "SKYQz6vHKDKs8ISw3KqxSuuP_uc";
        public string DeleteImage(string pathImage)
        {
            var public_id = pathImage.Split("-")[1];
            Account account = new Account(CLOUD_NAME, API_KEY, API_SECRET);
            cloudinary = new Cloudinary(account);
            if(public_id != "dcstxkiigmqnk634baka")
            {
                try
                {
                    DeletionParams destroyParams = new DeletionParams(public_id)
                    {
                        ResourceType = ResourceType.Image
                    };

                    DeletionResult destroyResult = cloudinary.Destroy(destroyParams);
                    return "success";
                }
                catch (Exception e)
                {
                    return "Delete fail";
                }
            }
            else
            {
                return "image default";
            }
            
            
        }
    }
}
