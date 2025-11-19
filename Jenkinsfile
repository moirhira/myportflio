pipeline {
        agent any

        stages {
                stage('Hello') {
                        steps {
                                echo 'Pipeline is working!'
                        }
                }
                stage('Install Node') {
                        steps {
                                sh """
                                        echo "Installing Node..."
                                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
                                        export NVM_DIR="\$HOME/.nvm"
                                        [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                                        nvm install 18
                                        nvm use 18
                                """
                        }
                }


        }
}