if (location.hash == '#test'){
    QUnit.test( "Test #1 - Title", function( assert ) {
    assert.equal(document.title, "Aim Game", "Title of page is Aim Game");
    });
    QUnit.test( "Test #2 - Target", function( assert ) {
    assert.ok(targetDifficulty, "Target exists");
    });
    QUnit.test( "Test #3 - Target Type", function( assert ) {
        if (targetDifficulty == "easyTarget"){
            assert.equal(targetDifficulty, "easyTarget", "Target type is set to easy");
        } else if (targetDifficulty == "mediumTarget"){
            assert.equal(targetDifficulty, "mediumTarget", "Target type is set to medium");
        } else if (targetDifficulty == "hardTarget"){
            assert.equal(targetDifficulty, "hardTarget", "Target type is set to hard");
        } else if (targetDifficulty == "ultraTarget"){
            assert.equal(targetDifficulty, "ultraTarget", "Target type is set to ultra");
        }
    });
    QUnit.test( "Test #4 - Target Size", function( assert ) {
        if (difficultySize == 59){
            assert.equal(difficultySize, 59, "Target size is set to easy");
        } else if (difficultySize == 39){
            assert.equal(difficultySize, 39, "Target size is set to medium");
        } else if (difficultySize == 29){
            assert.equal(difficultySize, 29, "Target size is set to hard");
        } else if (difficultySize == 19){
            assert.equal(difficultySize, 19, "Target size is set to ultra");
        }
    });
    QUnit.test( "Test #5 - Target Hit", function( assert ) {
    assert.ok(targetHit, "targetHit() exists");
    });
    QUnit.test( "Test #6 - Countdown Timer", function( assert ) {
    assert.ok(countdownTimer, "countdownTimer() exists");
    });
} else {
    document.getElementById("qunit").style.display = "none";
    document.getElementById("qunit-fixture").style.display = "none";
}

