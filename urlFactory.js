'use strict';
function RestUrlRule(router, route, ctrl) {
    router.get('/' + route + '/', ctrl.list);
    router.post('/' + route + '/', ctrl.create);
    router.get('/' + route + '/:id', ctrl.read);
    router.put('/' + route + '/:id', ctrl.update);
    router.delete('/' + route + '/:id', ctrl.delete);
}

module.exports = RestUrlRule;