<script>
    let { data } = $props();
    console.log(data);
</script>

<form method="POST" action="/homeworks">
    <div>
        <label>
            Nom&nbsp;:
            <input type="text" name="title" placeholder="Livrable SAÉ 401" required />
        </label>
    </div>
    <div>
        <label>
            Description&nbsp;:
            <textarea name="description" placeholder="Rendu à 23:59 + mail à l'adresse mail@example.com avec un excel avec les appréciations des membres du groupe." required></textarea>
        </label>
    </div>
    <div>
        <label>
            Date de fin&nbsp;:
            <input name="due-date" type="date" required />
        </label>
    </div>
    <div>
        <label>
            Matière&nbsp;:
            <select name="subject">
                {#each data.user.subjects as subject}
                    <option value={subject.id}>{subject.name}</option>
                {/each}
            </select>
        </label>
    </div>
    <br>
    <button type="submit">Create Homework</button>
</form>
