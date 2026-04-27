pipeline {
    agent any
    triggers {
        githubPush()
    }

    environment {
        // REEMPLAZA ESTO: Pon el ID que Jenkins generó automáticamente 
        // (el que viste en la lista de credenciales)
        DOCKER_HUB_ID = '1e2af35d-df46-421c-b1e6-d61d6aa3783e'
        DOCKER_USER = 'jorluis'
    }

    stages {
        stage('Limpieza Inicial') {
            steps {
                // Borra cualquier construcción previa para empezar limpio
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                // Jenkins descarga el código de GitHub
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
                    // Esta lista coincide exactamente con tus carpetas de VS Code
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
                        
                        // Construye la imagen usando el Dockerfile dentro de cada carpeta
                        sh "docker build -t ${DOCKER_USER}/${repo}:latest ./${carpeta}"
                        
                        // Sube la imagen a Docker Hub
                        sh "docker push ${DOCKER_USER}/${repo}:latest"
                        
                        // Opcional: Borra la imagen local para no llenar el disco del servidor
                        sh "docker rmi ${DOCKER_USER}/${repo}:latest"
                    }
                }
            }
        }
    }

    post {
        success {
            echo "¡Éxito! Todos los microservicios están en Docker Hub."
        }
        failure {
            echo "Hubo un error. Revisa el Console Output de Jenkins."
        }
    }
}