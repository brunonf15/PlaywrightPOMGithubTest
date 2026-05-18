pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timeout(time: 30, unit: 'MINUTES')
    }

    parameters {
        string(name: 'REPO_BRANCH', defaultValue: 'main', description: 'Branch do repositório a ser testada')
        string(name: 'REPO_URL',    defaultValue: 'https://github.com/brunofigueiredo/PlaywrightPOMGithubTest.git', description: 'URL do repositório')
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
                sh 'rm -rf reports || true'
            }
        }

        stage('Executar testes Playwright (Docker)') {
            steps {
                sh 'docker compose run --rm playwright-tests'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true, fingerprint: true

            publishHTML(target: [
                reportName: 'Playwright HTML Report',
                reportDir:  'reports/playwright-report',
                reportFiles: 'index.html',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: true
            ])

            // Requer o plugin Allure Jenkins instalado e configurado em "Global Tool Configuration".
            script {
                try {
                    allure([
                        includeProperties: false,
                        jdk: '',
                        results: [[path: 'reports/allure-results']]
                    ])
                } catch (err) {
                    echo "Plugin Allure não disponível ou sem resultados: ${err}"
                }
            }
        }
        success { echo 'Testes Playwright executados com sucesso.' }
        failure { echo 'Falha na execução dos testes Playwright. Verifique o relatório.' }
    }
}
