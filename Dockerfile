#syntax=docker/dockerfile:1
ARG SHA_HASH=sha256:c069b0179245b4b9ffa0b7545d88f8753a3008a4ba937c3d71e1eb37fce4d4b9
ARG NODE_VERSION=22.11
FROM node:${NODE_VERSION}-bookworm@${SHA_HASH} as base
ENV PNPM_HOME=/pnpm
ENV PATH="$PNPM_HOME:$PATH"

# Set the working directory to USER/workspace/app
ENV DIRPATH=/home/node
WORKDIR ${DIRPATH}/workspace/app

# Update apt-get before installing packages & dumb-init
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

# Enable corepack in order to install pnpm globally
RUN corepack enable && corepack install -g pnpm@9.11.0

# Default to 3000 for node, you can add 9229 and 9230 (tests) for debug
ENV PORT=3000
EXPOSE $PORT

RUN --mount=type=bind,source=package.json,target=${DIRPATH}/workspace/app/package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=${DIRPATH}/workspace/app/pnpm-lock.yaml \
    --mount=type=bind,source=.npmrc,target=${DIRPATH}/workspace/app/.npmrc

FROM base AS dev
# Create bind mounts for pnpm build files & create cache mount for pnpm and install pnpm dependencies
RUN  --mount=type=cache,id=pnpm,target=/.pnpm/store \
    pnpm install --frozen-lockfile
# Set to non-root user
USER node:node
COPY --chown=node:node . ${DIRPATH}/workspace/app
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["pnpm", "dev"]

FROM base AS test
COPY --chown=node:node . /workspace/app
RUN --mount=type=cache,id=pnpm,target=/.pnpm/store \
    pnpm install --frozen-lockfile
USER node:node
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["pnpm", "test"]

FROM base AS prod
COPY --chown=node:node . /workspace/app
RUN --mount=type=cache,id=pnpm,target=/.pnpm/store \
    pnpm install --frozen-lockfile --prod
USER node:node
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "dist/index.js"]

FROM base as ci
COPY --chown=node:node . /workspace/app
RUN --mount=type=cache,id=pnpm,target=/.pnpm/store \
    pnpm fetch \
    && pnpm install --frozen-lockfile \
    && pnpm build \
    && pnpm test
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "dist/index.js"]


