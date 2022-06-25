export default function (useCase, ...dependencies) {
    const first = dependencies[0];
    if (dependencies.length === 1 && typeof first === 'object' && !first.length) return useCase(dependencies[0]);
    return useCase(...dependencies);
}