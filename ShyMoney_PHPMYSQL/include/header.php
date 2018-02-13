<nav ng-show="!isNavHidden">
    <ul class="left">
        <li><a href="index.php">Graph view!</a></li>
        <li><a href="modify.php">Modify</a></li>
        <li><a href="mash.php">Mash</a></li>
    </ul>
    <ul class="right">
        <li><span ng-click="isNavHidden = !isNavHidden">Hide</span></li>
    </ul>
</nav>
<div class="nav-trigger" ng-show="isNavHidden">
    <ul class="left">
        <li><span ng-click="isNavHidden = !isNavHidden">Show</span></li>
    </ul>
</div>