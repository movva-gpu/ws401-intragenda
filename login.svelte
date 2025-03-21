<script>
  let activeTab = 'login';
  
  function openTab(tabName) {
    activeTab = tabName;
  }
</script>

<main>
  <div class="login-container">
    <div class="logo-container">
      <div class="logo">
        iUT<span>Troyes</span>
      </div>
    </div>

    <h1>LOREM</h1>
    <p class="description">
      Lorem ipsum dolor sit amet consectetur adipiscing elit ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.
    </p>

    <div class="tabs">
      <div 
        class="tab {activeTab === 'login' ? 'active' : ''}" 
        on:click={() => openTab('login')}
      >
        Connexion
      </div>
      <div 
        class="tab {activeTab === 'register' ? 'active' : ''}" 
        on:click={() => openTab('register')}
      >
        Inscription
      </div>
    </div>

    {#if activeTab === 'login'}
      <div class="tab-content active">
        <button class="btn-primary">CONNEXION URCA</button>
        
        <div class="separator">Compte invité</div>
        
        <form>
          <input type="text" placeholder="Identifiant" value="lorem">
          <input type="password" placeholder="Mot de passe" value="lorem">
          <button type="button" class="btn-secondary">CONNEXION "HORS URCA"</button>
        </form>
      </div>
    {:else if activeTab === 'register'}
      <div class="tab-content active">
        <form>
          <input type="text" placeholder="Nom">
          <input type="text" placeholder="Prénom">
          <input type="email" placeholder="Email">
          <input type="password" placeholder="Mot de passe">
          <input type="password" placeholder="Confirmer le mot de passe">
          <button type="button" class="btn-secondary">S'INSCRIRE</button>
        </form>
      </div>
    {/if}

    <p class="support-text">
      En cas de problème de connexion, contacter le support
      <br>à cette adresse : <a href="mailto:intranet.iut-troyes@univ-reims.fr" class="support-email">intranet.iut-troyes@univ-reims.fr</a>
    </p>
  </div>
</main>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  main {
    background-image: url(IUT-2.jpg);
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-container {
    background-color: white;
    width: 100%;
    max-width: 400px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 20px;
    text-align: center;
  }

  .logo-container {
    background-color: #ffb400;
    padding: 15px;
    margin: 0 auto 20px;
    border-radius: 5px;
    width: 100%;
    max-width: 250px;
  }

  .logo {
    font-size: 28px;
    font-weight: bold;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo span {
    font-size: 20px;
    margin-left: 5px;
  }

  h1 {
    color: #333;
    margin-bottom: 20px;
    font-size: 24px;
  }

  .description {
    color: #666;
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 1.4;
    padding: 0 15px;
  }

  .btn-primary {
    background-color: #ffb400;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 12px;
    width: 100%;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 20px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .btn-secondary {
    background-color: #ffb400;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 12px;
    width: 100%;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .separator {
    display: flex;
    align-items: center;
    text-align: center;
    color: #999;
    margin: 15px 0;
  }

  .separator::before,
  .separator::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ddd;
  }

  .separator::before {
    margin-right: 10px;
  }

  .separator::after {
    margin-left: 10px;
  }

  input[type="text"],
  input[type="password"],
  input[type="email"] {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
  }

  .support-text {
    color: #666;
    font-size: 12px;
    margin-top: 20px;
    line-height: 1.5;
  }

  .support-email {
    color: #666;
    text-decoration: none;
  }

  /* Tabs for login/register */
  .tabs {
    display: flex;
    margin-bottom: 20px;
  }

  .tab {
    flex: 1;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    border-bottom: 2px solid transparent;
  }

  .tab.active {
    border-bottom: 2px solid #ffb400;
    font-weight: bold;
  }

  .tab-content {
    display: block;
  }
</style>
