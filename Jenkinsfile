def services = [
    'backapp',
    'frontapp'
]



pipeline{
    agent any
    environment {
        GOOGLE_CLIENT_ID = credentials('google_client_id')
        GOOGLE_CLIENT_ID = credentials('google_client_id')
        SMTP_SERVICE = 'gmail'
        SMTP_USER = 'little8867@gmail.com'
        JWT_SECRET_KEY = credentials('jwt_secret_key')
        SMTP_PASSWORD = credentials('smtp_password')
        MONGODB_URL = credentials('mongodb_url')
        SENTIMENT_PREDICT_FLASK_SERVER_URL = credentials('sentiment_predict_flask_server_url')
        STABLE_DIFFUSION_FLASK_SERVER_URL = credentials('stable_diffusion_flask_server_url')
        SERVER_PORT = 3000
        VITE_GOOGLE_CLIENT_ID = credentials('vite_google_client_id')
        VITE_SERVER_HOST = credentials('vite_server_host')
        S3_ACCESS_KEY_ID = credentials('s3_access_key_id')
        S3_SECRET_ACCESS_KEY = credentials('s3_secret_access_key')
        S3_BUCKET_NAME = 'damchae'
        S3_REGION = 'ap-northeast-2'
    }
    stages{
        stage("Checkout") {
            steps{
                echo "Pulling Repository................."
                checkout scmGit(branches: [[name: '*/dev']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/snghyun331/elice-damchae-upgrade']])
            }
        }
        
        stage('Deleting latest containers and images') {
            steps{
                script{
                    for (service in services) {
                        echo "Deleting latest containers for ${service}............."
                        sh "docker kill ${service} || true"  // 컨테이너가 없을 경우 에러 무시
                        sh "docker rm ${service} || true"
                    }
                }
                
                echo 'Deleting latest images............'
                sh 'docker rmi -f $(docker images -q --filter "reference=snghyun/*") || true'
            }
        }

        stage('Build Docker images And Delploy') {
            steps{
                script{
                    echo "inserting env variables......................"
                        sh '''
                            touch .env
                            echo "GOOGLE_CLIENT_ID = ${env.GOOGLE_CLIENT_ID}" >> .env
                            echo "SMTP_SERVICE = ${env.SMTP_SERVICE}" >> .env
                            echo "SMTP_USER = ${env.SMTP_USER}" >> .env
                            echo "JWT_SECRET_KEY = ${env.JWT_SECRET_KEY}" >> .env
                            echo "SMTP_PASSWORD = ${env.SMTP_PASSWORD}" >> .env
                            echo "MONGODB_URL = ${env.MONGODB_URL}" >> .env
                            echo "SENTIMENT_PREDICT_FLASK_SERVER_URL = ${env.SENTIMENT_PREDICT_FLASK_SERVER_URL}" >> .env
                            echo "STABLE_DIFFUSION_FLASK_SERVER_URL = ${env.STABLE_DIFFUSION_FLASK_SERVER_URL}" >> .env
                            echo "SERVER_PORT = ${env.SERVER_PORT}" >> .env
                            echo "VITE_GOOGLE_CLIENT_ID = ${env.VITE_GOOGLE_CLIENT_ID}" >> .env
                            echo "VITE_SERVER_HOST = ${env.VITE_SERVER_HOST}" >> .env
                            echo "VITE_GOOGLE_CLIENT_ID = ${env.VITE_GOOGLE_CLIENT_ID}" >> .env
                            echo "S3_ACCESS_KEY_ID = ${env.S3_ACCESS_KEY_ID}" >> .env
                            echo "S3_BUCKET_NAME = ${env.S3_BUCKET_NAME}" >> .env
                            echo "S3_REGION = ${env.S3_REGION}" >> .env              
                            '''
                        sh 'docker-compose up -d --build' 
                }
            }
        }
        
        stage('Tag and Push to Hub') {
            steps{
                echo "Tagging and pushing to hub.................."
                script{
                    services.each { service ->
                      stage ("${service} Push") {
                          echo "${service} Pushing..."
                          withCredentials([string(credentialsId: 'docker_pwd', variable: 'docker_hub_pwd')]) {
                              def imageName = "damchae1_${service.toLowerCase()}:latest"
                              def imageTag = "snghyun/damchae_pipeline_${service.toLowerCase()}:${BUILD_NUMBER}"
                              // 이미지 태깅
                              sh "docker tag ${imageName} ${imageTag}"
                              // Hub에 로그인
                              sh "docker login -u snghyun331@gmail.com -p ${docker_hub_pwd}"
                              // 이미지를 허브로 푸쉬
                              sh "docker push ${imageTag}"
                            }
                        }
                    }              
                }   
            }
        }
    }
}






