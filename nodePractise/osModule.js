import os from "os";

const osArchitecture = os.arch();
console.log(`Operating System Architecture: ${osArchitecture}`);

const osPlatform = os.platform();
console.log(`Operating System Platform: ${osPlatform}`);

const osHostname = os.hostname();
console.log(`Operating System Hostname: ${osHostname}`);

const osType = os.type();
console.log(`Operating System Type: ${osType}`);

const osRelease = os.release();
console.log(`Operating System Release: ${osRelease}`);

const osUptime = os.uptime();
console.log(`Operating System Uptime: ${osUptime / 3600} hours`);

const osVersion = os.version();
console.log(`Operating System Version: ${osVersion}`);

const osUserInfo = os.userInfo();
console.log(`Operating System User Info: ${JSON.stringify(osUserInfo)}`);

const osHomeDir = os.homedir();
console.log(`Operating System Home Directory: ${osHomeDir}`);

const osTempDir = os.tmpdir();
console.log(`Operating System Temporary Directory: ${osTempDir}`);

const osCPUs = os.cpus();
console.log(`Operating System CPUs: ${JSON.stringify(os.cpus().length)} cores`);
console.log(`Operating System CPUs: ${JSON.stringify(osCPUs)} cores`);

const osAvailableParallelism = os.availableParallelism();
console.log(
  `Operating System Available Parallelism: ${osAvailableParallelism} threads`
);

const osTotalMemory = os.totalmem();
console.log(`Operating System Total Memory: ${osTotalMemory / (1024 * 1024 * 1024)} GB`);

const osFreeMemory = os.freemem();
console.log(`Operating System Free Memory: ${osFreeMemory / (1024 * 1024 * 1024)} GB`);

const osLoadAverage = os.loadavg();
console.log(`Operating System Load Average (1, 5, 15 min): ${osLoadAverage}`);

const osNetworkInterfaces = os.networkInterfaces();
console.log(`Operating System Network Interfaces: ${JSON.stringify(osNetworkInterfaces)}`);

const osEndianness = os.endianness();
console.log(`Operating System Endianness: ${osEndianness}`);

const osMachine = os.machine();
console.log(`Operating System Machine: ${osMachine}`);

const osEol = os.EOL;
console.log(`Operating System End-of-Line Marker: ${JSON.stringify(osEol)}`);

const osConstants = os.constants;
console.log(`Operating System Constants: ${JSON.stringify(osConstants)}`);