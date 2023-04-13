import cluster from 'node:cluster';
import { cpus } from 'node:os';
const numCPUs = cpus().length;

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    const numWorkers = Math.min(numCPUs, 10);

    // Fork workers.
    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, _code, _signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    import('./server.js');

    console.log(`Worker ${process.pid} started`);
}
