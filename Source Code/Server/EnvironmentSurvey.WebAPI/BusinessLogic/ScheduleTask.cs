using EnvironmentSurvey.WebAPI.DataAccess;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.BusinessLogic
{
    public class ScheduleTask : CronJobService
    {
        private readonly ILogger<ScheduleTask> _logger;
        public IServiceProvider Services { get; }

        public ScheduleTask(IScheduleConfig<ScheduleTask> config, ILogger<ScheduleTask> logger, IServiceProvider services)
            : base(config.CronExpression, config.TimeZoneInfo)
        {
            _logger = logger;
            Services = services;
        }
        public override Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Schedule Task starts.");
            return base.StartAsync(cancellationToken);
        }

        public async override Task<Task> DoWork(CancellationToken cancellationToken)
        {
            _logger.LogInformation($"{DateTime.Now:hh:mm:ss} Schedule Task is working.");
            using (var scope = Services.CreateScope())
            {
                var resutlService = scope.ServiceProvider.GetService<IResultService>();
                await resutlService.ScheduleGetTopResult();
            }
            return Task.CompletedTask;
        }

        public override Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Schedule Task is stopping.");
            return base.StopAsync(cancellationToken);
        }
    }
}
