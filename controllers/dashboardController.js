exports.dashboardGetController = (req, res, next) => {
    res.render('pages/dashboard/dashboard', {title: 'my dashboard'})
}