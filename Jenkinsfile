def services = [
    'backapp',
    'frontapp'
]

pipeline{
    agent any
    
    environment {
        GOOGLE_CLIENT_ID = credentials('google_client_id')
        SMTP_PASSWORD = credentials('smtp_password')
        SMTP_SERVICE = 'gmail'
        SMTP_USER = 'little8867@gmail.com'
        JWT_SECRET_KEY = credentials('jwt_secret_key')
        MONGODB_ALTERNATIVE_URL = credentials('mongodb_alternative_url')
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
        stage('Checkout') {
            steps{
                echo 'Pulling Repository.................'
                checkout scmGit(branches: [[name: '*/dev']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/snghyun331/elice-damchae-upgrade']])
            }
        }
        
        stage('Deleting latest containers and images') {
            steps{
                script{
                    for (service in services) {
                        echo 'Deleting latest containers for ${service}.............'
                        sh 'docker kill ${service}'
                        sh 'docker rm ${service}'
                    }
                }
                
                echo 'Deleting latest images............'
                sh 'docker rmi -f $(docker images -q --filter "reference=snghyun/*")'
            }
        }

        stage('Build Docker images And Delploy') {
            steps{
                echo "Building &  Deploying docker images............."
                script{
                    // elice-damchae-upgrade 폴더로 이동
                    // dir('elice-damchae-upgrade') { 
                    //     sh 'docker-compose up -d --build' 
                    // }
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






