pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timeout(time: 30, unit: 'MINUTES')
    }

    parameters {
        string(name: 'REPO_BRANCH', defaultValue: 'docker', description: 'Branch do repositório a ser testada')
        string(name: 'REPO_URL',    defaultValue: 'https://github.com/brunonf15/PlaywrightPOMGithubTest', description: 'URL do repositório')
    }

    environment {
        REPO_BRANCH = "${params.REPO_BRANCH}"
        REPO_URL    = "${params.REPO_URL}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Limpar relatórios anteriores') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'rm -rf reports || true'
                    } else {
                        bat 'if exist reports rmdir /s /q reports'
                    }
                }
            }
        }

        stage('Executar testes Playwright (Docker)') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker compose run --rm playwright-tests'
                    } else {
                        bat 'docker compose run --rm playwright-tests'
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true, fingerprint: true

            // Allure (plugin "Allure Jenkins Plugin" deve estar instalado)
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'reports/allure-results']]
            ])
        }
        success { echo 'Testes Playwright executados com sucesso.' }
        failure { echo 'Falha na execução dos testes Playwright. Verifique o relatório.' }
    }
}
