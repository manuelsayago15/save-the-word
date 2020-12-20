<template>
    <div>
        <Navbar/>
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <h1>MY LIST</h1>
                </div>
                <div class="col-lg-4 input-search">
                    <input type="text" placeholder="Search a word">
                </div>
                
            </div>
        </div>
        <table class="table">
        <thead>
            <tr>
            <th scope="col">WORD</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">TRANSLATION</th>
            <th scope="col">AUDIO</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <th scope="row">save</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            </tr>
            <tr>
            <th scope="row">hijack</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            </tr>
            <tr>
            <th scope="row">warehouse</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            </tr>
        </tbody>
        </table>
    </div>
</template>
<script>
import Navbar from '@/components/Navbar';
export default {
    name: 'MyList',
    components: {
        Navbar
    },
    data () {
        return {
            
        }
    }
}
</script>
<style scoped>
    .input-search{
        margin-top: 6px;
    }
</style>