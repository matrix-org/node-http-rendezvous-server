module.exports = {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        ['@eclass/semantic-release-docker', {
            'baseImageName': 'node-http-rendezvous-server',
            'registries': [{
                'url': 'ghcr.io',
                'imageName': 'ghcr.io/matrix-org/node-http-rendezvous-server',
                'user': 'GITHUB_USER',
                'password': 'GITHUB_TOKEN',
            }],
        }],
        ['@semantic-release/git', {
            assets: ['package.json', 'CHANGELOG.md'],
            message: 'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}',
        }],
        '@semantic-release/github',
    ],
};
