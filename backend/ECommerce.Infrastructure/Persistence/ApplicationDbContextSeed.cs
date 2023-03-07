using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using ECommerce.Domain.Entities;
using ECommerce.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ECommerce.Infrastructure.Persistence
{
    public class ApplicationDbContextSeed
    {
        public static async Task SeedAsync(ApplicationDbContext context, UserManager<AppUser> userManager, ILoggerFactory loggerFactory)
        {
            try
            {
                if(!await context.Users.AnyAsync())
                {
                    var usersData = File.ReadAllText("../Ecommerce.Infrastructure/Persistence/SeedData/users.json");

                    var users = JsonSerializer.Deserialize<List<AppUser>>(usersData);

                    foreach (var user in users)
                    {
                        await userManager.CreateAsync(user, "T0n1car7Malajohnson@");
                    }

                    await context.SaveChangesAsync();
                }
                if(!await context.ProductBranches.AnyAsync())
                {
                    var branchesData = File.ReadAllText("../Ecommerce.Infrastructure/Persistence/SeedData/branches.json");

                    var brands = JsonSerializer.Deserialize<List<ProductBranch>>(branchesData);

                    foreach (var item in brands)
                    {
                        await context.ProductBranches.AddAsync(item);
                    }

                    await context.SaveChangesAsync();
                }
                if(!await context.ProductTypes.AnyAsync())
                {
                    var typesData = File.ReadAllText("../Ecommerce.Infrastructure/Persistence/SeedData/types.json");

                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);

                    foreach (var item in types)
                    {
                        await context.ProductTypes.AddAsync(item);
                    }

                    await context.SaveChangesAsync();

                }
                if(!await context.Products.AnyAsync())
                {
                    var productsData = File.ReadAllText("../Ecommerce.Infrastructure/Persistence/SeedData/products.json");

                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                    foreach (var item in products)
                    {
                        await context.Products.AddAsync(item);
                    }

                    await context.SaveChangesAsync();
                }
                if(!await context.Images.AnyAsync())
                {
                    var imagesData = File.ReadAllText("../Ecommerce.Infrastructure/Persistence/SeedData/images.json");

                    var images = JsonSerializer.Deserialize<List<Image>>(imagesData);

                    foreach (var item in images)
                    {
                        await context.Images.AddAsync(item);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (System.Exception e)
            {
                var logger = loggerFactory.CreateLogger<ApplicationDbContextSeed>();
                logger.LogError(e.Message);
            }
        }
    }
}