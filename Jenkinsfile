pipeline {
    agent any
    triggers {
        githubPush()
    }

    environment {
        DOCKER_HUB_ID = '1e2af35d-df46-421c-b1e6-d61d6aa3783e'
        DOCKER_USER = 'jorluis'
        KALI_CRED_ID = 'a5cefc2c-e52e-4bb1-9e48-bc5cdb8cbef8' // Agregamos la IP de tu VM aquí para que sea fácil cambiarla en la U
        KALI_IP = '192.168.232.128'
        
    }

    stages {
        stage('Limpieza Inicial') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Login a Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_ID}", passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USER')]) {
                        sh "echo \$DOCKER_HUB_PASSWORD | docker login -u \$DOCKER_HUB_USER --password-stdin"
                    }
                }
            }
        }

        stage('Build & Push All Services') {
            steps {
                script {
                    def servicios = [
                        'attendance': 'erp-attendance',
                        'employees' : 'erp-employees',
                        'frontend'  : 'erp-frontend',
                        'gateway'   : 'erp-gateway',
                        'payroll'   : 'erp-payroll',
                        'reports'   : 'erp-reports',
                        'tasks'     : 'erp-tasks'
                    ]

                    servicios.each { carpeta, repo ->
                        echo "--- Procesando: ${carpeta} ---"
                        sh "docker build -t ${DOCKER_USER}/${repo}:latest ./${carpeta}"
                        sh "docker push ${DOCKER_USER}/${repo}:latest"
                        sh "docker rmi ${DOCKER_USER}/${repo}:latest"
                    }
                }
            }
        }

        // --- ESTA ES LA ETAPA QUE TE FALTABA PARA EL CD ---
        stage('Deploy to Kali VM') {
            steps {
                script {
                    echo "--- Iniciando Despliegue en la VM Kali ---"
                    withCredentials([usernamePassword(credentialsId: "${KALI_CRED_ID}", passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        // Este comando entra a la VM, va a la carpeta y actualiza el servicio de employees
                        sh """
                        sshpass -p '$PASS' ssh -o StrictHostKeyChecking=no $USER@${KALI_IP} << 'EOF'
                            cd ~/erp-despliegue
                            docker-compose pull employees
                            docker-compose up -d employees
                            echo "--- Despliegue en Kali exitoso ---"
                            docker ps
                        EOF
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "¡Éxito! Todo desplegado en la VM de Kali."
        }
        failure {
            echo "Hubo un error. Revisa el Console Output."
        }
    }
}