pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'linux-react-dream'
        DOCKER_TAG = "${BUILD_NUMBER}"
        CONTAINER_NAME = 'react-app-container'
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials') // You need to configure this in Jenkins
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Get code from GitHub repository
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    // Install bun if not already installed
                    sh '''
                        if ! command -v bun &> /dev/null; then
                            curl -fsSL https://bun.sh/install | bash
                        fi
                    '''
                    // Install project dependencies
                    sh 'bun install'
                }
            }
        }
        
        stage('Build') {
            steps {
                // Build React application
                sh 'bun run build'
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    // Build Docker image
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }
        
        stage('Docker Push') {
            steps {
                script {
                    // Login to Docker Hub
                    sh '''
                        echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin
                    '''
                    
                    // Push image to Docker Hub
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Stop and remove existing container if it exists
                    sh '''
                        if docker ps -a | grep -q ${CONTAINER_NAME}; then
                            docker stop ${CONTAINER_NAME}
                            docker rm ${CONTAINER_NAME}
                        fi
                    '''
                    
                    // Run new container
                    sh "docker run -d -p 3000:80 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
    }
    
    post {
        always {
            // Clean up Docker images
            script {
                sh '''
                    docker image prune -f
                    docker logout
                '''
            }
            
            // Clean workspace
            cleanWs()
        }
        
        success {
            echo 'Pipeline successfully completed!'
        }
        
        failure {
            echo 'Pipeline failed!'
        }
    }
}