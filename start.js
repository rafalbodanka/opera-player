const { exec } = require('child_process');
const path = require('path');

const backendPath = path.join(__dirname, 'backend');
const frontendPath = path.join(__dirname, 'frontend');

const installDependencies = (directory) => {
    return new Promise((resolve, reject) => {
        exec('npm install', { cwd: directory }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                console.log(stdout);
                resolve();
            }
        });
    });
};

const startServices = async () => {
    console.log('Installing dependencies...')
    try {
        // Install backend dependencies
        await installDependencies(backendPath);

        // Install frontend dependencies
        await installDependencies(frontendPath);

        // Start backend service
        const backendProcess = exec('node server.js', { cwd: backendPath });
        backendProcess.stdout.on('data', (data) => {
            console.log(`Backend: ${data}`);
        });

        // Start frontend service
        const frontendProcess = exec('npm start', { cwd: frontendPath });
        frontendProcess.stdout.on('data', (data) => {
            console.log(`Frontend: ${data}`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

startServices();