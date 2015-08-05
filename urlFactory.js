'use strict';
function RestUrlRule(router, route, ctrl) {
    var p = route ? ('/' + route) : '';
    router.get(p + '/', ctrl.list);
    router.post(p + '/', ctrl.create);
    router.get(p + '/:id', ctrl.read);
    router.put(p + '/:id', ctrl.update);
    router.delete(p + '/:id', ctrl.delete);
}

module.exports = RestUrlRule;